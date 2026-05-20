import { useState } from "react";
import questions from './Quiz (1)';
import Quiz from './Quiz (1)';

export const Results = ({ answer }) => {
    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
                <h3>Results</h3>
                <ul style = {{listStyle: 'none', textAlight: 'left'}}>
                    {
                        options.map((elem, index) =>{

                            return(
                                <li>
                                    <h5>{index + 1}.{questions[index].question}</h5>
                                    <p>{elem}</p>
                                    if(answers[q.id] !== option){
                                        <p>{questions[index].feedback}</p>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>

                <button
                    type="button"
                    onClick={resetQuiz}
                    style={{ padding: "10px", marginLeft: "10px" }}
                >
                 Retry Quiz
                </button>

                {/* RESULT DISPLAY */}
                {result && (
                    <div style={{ marginTop: "20px" }}>
                        <h2>
                            Score: {result.score} / {questions.length}
                        </h2>
                    </div>
                )}
            </div>
    )
}
