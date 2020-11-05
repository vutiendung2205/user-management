import './App.css';
import Header from './components/Header/Header';
import { ThemeProvider } from '@material-ui/styles';
import DataTable from './components/DataTable/DataTable';
import theme from './Themes';

function App() {
  return (
    <ThemeProvider theme={theme} >
        <div className="App">
            <Header />
            <DataTable />
        </div>
    </ThemeProvider>
  );
}

export default App;
