import Page from '../models/page_model.js'

// Crear página
export const createPage = async (req, res) => {
  try {
    const { name, content, icon, cover, favorite } = req.body
    const newPage = new Page({ name, content, icon, cover, favorite, userId: req.user.id })
    await newPage.save()
    res.status(201).json(newPage)
  } catch (error) {
    res.status(500).json({ message: "Error al crear la página." })
  }
}

export const getPages = async (req, res) => {
  try {
    const pages = await Page.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })
      .select('-content') // se excluye la propiedad 'content' para que la carga no sea tan pesada

    res.json(pages)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las páginas." })
  }
}

// Obtener una página por ID
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findOne({ _id: req.params.id, userId: req.user.id })
    if (!page) return res.status(404).json({ message: "Página no encontrada." })

    res.json(page)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la página." })
  }
}

// Actualizar página
export const updatePage = async (req, res) => {

  try {
    const updatedPage = await Page.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    )

    if (!updatedPage) return res.status(404).json({ message: "Página no encontrada." })

    res.json(updatedPage)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la página." })
  }
}

// Eliminar página
export const deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (!deletedPage) return res.status(404).json({ message: "Página no encontrada." })

    res.json({ message: "Página eliminada correctamente." })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la página." })
  }
}
