import gameService from "./service";

const create = async (req, res) => {
  try {
    const { playerId } = req.body;
    const game = await gameService.create(playerId);

    return res.json(game);
  } catch (error) {
    return res.status(500).send();
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await gameService.get(id);

    if (!game) {
      return res.status(404).send();
    }

    return res.json(game);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send();
    }

    return res.status(500).send();
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await gameService.update(id, req.body);

    return res.json(game);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const gameController = {
  create,
  get,
  update,
};

export default gameController;
