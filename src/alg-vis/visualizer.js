import React from 'react';


//import algorithms
import {getBubbleSortAnimations} from './bubblesort';
import {getQuickSortAnimations} from './quicksort';

//variables
let animSpeed = 1;
let arraySize = 200;


export default class ArrayContainer extends React.Component {

    constructor(props){
        super(props);

        this.animationSpeed = animSpeed;
        this.primaryColor = "whitesmoke";
        this.secondaryColor = "crimson";

        this.state = {
            visArray: [],
        };
    }

    componentDidMount() {
        this.initArray();
    }

    initArray() {
        const visArray = []
        for (let i = 0; i < arraySize; i++) {
            visArray.push(randomIntFromInterval(5,500));
        }
        this.setState({visArray});
    }

    render() {
         
        const {visArray} = this.state;
        
        return (
            <div className="container">

                <div className="alg-buttons">
                    <button onClick={() => this.initArray()}>Reset</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>

                <div className="arrContainer">
                    {visArray.map((value, idx) => (
                        <div 
                            className="array-bar" 
                            key={idx}
                            style = {{height: `${value}px`}}
                        />  
                    ))}
                </div>
            
            
            </div>
            
        );
        
    }

    bubbleSort() {
        // Handles displaying bubble sort animations
        const animations = getBubbleSortAnimations(this.state.visArray);
        for (let i = 0; i < animations.length; i++) {
          const isColorChange =
            animations[i][0] === "comparison1" ||
            animations[i][0] === "comparison2";
          const arrayBars = document.getElementsByClassName("array-bar");
          if (isColorChange) {
            const color =
              animations[i][0] === "comparison1"
                ? this.secondaryColor
                : this.primaryColor;
            const [, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * this.animationSpeed);
          } else {
            const [, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
              continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
              barStyle.height = `${newHeight}px`;
            }, i * this.animationSpeed);
          }
        }
      }

      quickSort() {
        // Handles displaying quick sort animations
        const animations = getQuickSortAnimations(this.state.visArray);
        for (let i = 0; i < animations.length; i++) {
          const isColorChange =
            animations[i][0] === "comparison1" ||
            animations[i][0] === "comparison2";
          const arrayBars = document.getElementsByClassName("array-bar");
          if (isColorChange === true) {
            const color =
              animations[i][0] === "comparison1"
                ? this.secondaryColor
                : this.primaryColor;
            const [, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * this.animationSpeed);
          } else {
            const [, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
              continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
              barStyle.height = `${newHeight}px`;
            }, i * this.animationSpeed);
          }
        }
      }

    

}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}