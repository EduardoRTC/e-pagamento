import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PainelControle from "./pages/PainelControlePagina";
import AdicionaFuncionario from "./pages/AdicionaFuncionario";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<PainelControle />} />
				<Route exact path="/adicionafuncionario" element={<AdicionaFuncionario/>}/>
			</Routes>
		</Router>
	);
}

export default App;
