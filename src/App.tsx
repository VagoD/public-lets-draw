import './App.css';
import DrawingArea from './components/drawing-area';
import { Toolbar } from './components/toolbar';
import { ShapeContextProvider } from './utils/ShapeContextProvider';
import { ToolContextProvider } from './utils/ToolContextProvider';
import { Infobar } from './components/infobar';

function App() {
  return (
    <>
      <ToolContextProvider>
        <ShapeContextProvider>
          <>
            <div className='container'>
              <Toolbar />
              <div className='inner-container'>
                <DrawingArea />
                <Infobar />
              </div>
            </div>

          </>
        </ShapeContextProvider>
      </ToolContextProvider>
    </>
  );
}

export default App;
