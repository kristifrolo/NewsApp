import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Gallery } from "./pages/Gallery"
import { Layout } from "./components/Layout"
import type { FC } from "react"
import { AddPost } from "./pages/AddPost"
import { Favorites } from "./pages/Favorites"

export const App: FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addPost" element={<AddPost />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}