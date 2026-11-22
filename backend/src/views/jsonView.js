export const jsonView = {
  data(res, data, status = 200) {
    return res.status(status).json({ data });
  },
  error(res, status, message, fields) {
    return res.status(status).json({
      error: { message, ...(fields ? { fields } : {}) },
    });
  },
  empty(res) {
    return res.status(204).send();
  },
};
