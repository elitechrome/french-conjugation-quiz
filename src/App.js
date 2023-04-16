import React, { useState } from "react";
import Modal from 'react-modal'
// import verbs from './verbData.json'
const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');
const verbs = ['danser', 'finir', 'être', 'avoir', 'aller', 'connaître', 'faire', 'pouvoir', 'prendre', 'venir', 'savoir', 'vouloir']
const personalPronouns = ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"]
const tenses = {
  "Present":"PRESENT",
  "Imparfait":"IMPARFAIT",
  "Futur Simple":"FUTUR",
  "Conditionnel Présent":"CONDITIONNEL_PRESENT",
  "Subjonctif Présent":"SUBJONCTIF_IMPARFAIT",
}

  function ConjugationQuiz() {
    const [verbIndex, setVerbIndex] = useState(0);
    const [tense, setTense] = useState(Object.entries(tenses)[0]);
    const [answers, setAnswers] = useState(new Array(6).fill(""));
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
  
    const verb = verbs[verbIndex];
  
    const handleAnswerChange = (event, index) => {
      const newAnswers = [...answers];
      newAnswers[index] = event.target.value;
      setAnswers(newAnswers);
    };
  
    const handleCheckAnswers = (event) => {
      event.preventDefault();
      let newScore = 0;
      for (let i = 0; i < 6; i++) {
        if (answers[i] === FrenchVerbs.getConjugation(Lefff, verb, tense[1], i)) {
          newScore++;
        }
      }
      setScore(newScore);
    };
  
    const handleNext = () => {
      setVerbIndex((prevIndex) => (prevIndex + 1) % verbs.length);
      setTense(Object.entries(tenses)[0]);
      setAnswers(new Array(6).fill(""));
      setScore(0);
    };
  
    const handleHint = () => {
      setShowHint(true);
    };
  
    const handleCloseHint = () => {
      setShowHint(false);
    };
  
    const hintModal = (
      <div className={`modal ${showHint ? "d-block" : "d-none"}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${verb} - ${tense[0]}`}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseHint}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            {personalPronouns.map((personalPronoun, index) => (
                <div key={index}>
                  {`${personalPronouns[index]} ${FrenchVerbs.getConjugation(Lefff, verb, tense[1], index)}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="container">
        <h1>Conjugation Quiz</h1>
        <form>
          <div className="form-group">
          <label htmlFor="verb-select">Verb</label>
          <select id="verb-select" className="form-control" value={verbIndex} onChange={(event) => setVerbIndex(event.target.value)}>
            {verbs.map((verb, index) => (
              <option key={index} value={index}>{verb}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tense-select">Tense</label>
          <select id="tense-select" className="form-control" value={tense} onChange={(event) => setTense(event.target.value)}>
          {Object.entries(tenses).map((t, index) => (
              <option key={index} value={t[1]}>{t[0]}</option>
            ))}
          </select>
        </div>
        <table className="table table-bordered">
          <tbody>
            {personalPronouns.map((personalPronoun, index) => (
              <tr key={index}>
                <td>{personalPronoun}</td>
                <td><input type="text" className="form-control" value={answers[index]} onChange={(event) => handleAnswerChange(event, index)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" onClick={handleCheckAnswers}>Check Answers</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleHint}>Hint</button>
        </div>
      </form>
      <div className="mt-3">
        {score !== null && (
          <div>
            <p>Your score: {score} / 6</p>
            <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
          </div>
        )}
      </div>
      <Modal isOpen={showHint}>
      {hintModal}
      </Modal>
    </div>
  );
}

export default ConjugationQuiz;
