import './data.css';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import p5 from 'p5';

function sketch(p) {
    // p is a reference to the p5 instance this sketch is attached to

      let foregroundImg;
      let backgroundImg;
      let brushSize = 30;
      let isDrawing = false;

      p.preload = function () {
        let foregroundImageUrl =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nymphaea_nouchali5.JPG/440px-Nymphaea_nouchali5.JPG';
        foregroundImg = p.loadImage(foregroundImageUrl);

        let backgroundImageUrl =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/440px-Rosa_rubiginosa_1.jpg';
        backgroundImg = p.loadImage(backgroundImageUrl);
      };

      
    p.setup = function() {
      let canvas = p.createCanvas(800, 800);
        p.background(0);

        foregroundImg.resize(p.width, p.height);
        backgroundImg.resize(p.width, p.height);

        canvas.mousePressed(startDrawing);
        canvas.mouseReleased(stopDrawing);

        canvas.ontouchstart = function (event) {
          startDrawing();
          return false;
        };

        canvas.ontouchend = function (event) {
          stopDrawing();
          return false;
        };

    }

    p.draw = function() {
        // your draw code here

        p.scale(1.0); // set scale to fit the image

        if (!isDrawing) {
          p.background(255, 0);
          p.image(foregroundImg, 0, 0, p.width, p.height);
        } else {
          let scaledMouseX = p.mouseX * 1; // adjust to scale
          let scaledMouseY = p.mouseY * 1; // adjust toS scale

          p.noFill();
          p.stroke(255);
          p.strokeWeight(2);
          p.rectMode(p.CENTER);

          p.rect(
            scaledMouseX,
            scaledMouseY,
            brushSize,
            brushSize
          );

          foregroundImg.copy(
            backgroundImg,
            scaledMouseX - brushSize / 2,
            scaledMouseY - brushSize / 2,
            brushSize,
            brushSize,
            scaledMouseX - brushSize / 2,
            scaledMouseY - brushSize / 2,
            brushSize,
            brushSize
          );

          p.image(foregroundImg, 0, 0, p.width, p.height);
        }
    }

    function startDrawing() {
      isDrawing = true;
    }

    function stopDrawing() {
      isDrawing = false;
    }

    p.mouseWheel = function (event) {
      brushSize += event.delta;
      brushSize = p.constrain(brushSize, 10, 100);
      return false;
    }
}

function App() {
    // create a reference to the container in which the p5 instance should place the canvas
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [links, setLinks] = useState();
    const [titles, setTitles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const p5ContainerRef = useRef();

    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, []);

    return (
        <div className="App" ref={p5ContainerRef} />
    );
}

export default App;