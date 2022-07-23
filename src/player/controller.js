import playerService from "../player/service";

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const player = await playerService.create(name);

    return res.json(player);
  } catch (error) {
    return res.status(500).send();
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerService.get(id);

    if (!player) {
      return res.status(404).send();
    }

    return res.json(player);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send();
    }

    return res.status(500).send();
  }
};

const playerController = {
  create,
  get,
};

export default playerController;
