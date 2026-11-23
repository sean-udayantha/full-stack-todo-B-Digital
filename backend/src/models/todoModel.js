const columns = 'id, title, description, done, created_at, updated_at';

function toTodo(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    done: Boolean(row.done),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function createTodoModel(db) {
  const findById = async (id) => {
    const [rows] = await db.execute(`SELECT ${columns} FROM todos WHERE id = ?`, [id]);
    return toTodo(rows[0]);
  };

  return {
    async findAll() {
      const [rows] = await db.execute(`SELECT ${columns} FROM todos ORDER BY created_at DESC, id DESC`);
      return rows.map(toTodo);
    },
    async create({ title, description }) {
      const [result] = await db.execute(
        'INSERT INTO todos (title, description) VALUES (?, ?)', [title, description],
      );
      return findById(result.insertId);
    },
    async update(id, values) {
      const fields = ['title', 'description'].filter((field) => values[field] !== undefined);
      const assignments = fields.map((field) => `${field} = ?`).join(', ');
      const [result] = await db.execute(
        `UPDATE todos SET ${assignments}, updated_at = UTC_TIMESTAMP(3) WHERE id = ?`,
        [...fields.map((field) => values[field]), id],
      );
      return result.affectedRows ? findById(id) : null;
    },
    async toggleDone(id) {
      const [result] = await db.execute('UPDATE todos SET done = NOT done, updated_at = UTC_TIMESTAMP(3) WHERE id = ?', [id]);
      return result.affectedRows ? findById(id) : null;
    },
    async remove(id) {
      const [result] = await db.execute('DELETE FROM todos WHERE id = ?', [id]);
      return result.affectedRows > 0;
    },
  };
}
