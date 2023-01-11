import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'
import {card} from './card.js'
function App() {
  const [FCOption, setFCOption] = useState(0)
  const [categories, setCategories] = useState(card)
  const defaultFlashCard = categories[0].cards.map((card)=>{
    return {
      id:`${Math.random()}-${Date.now()}`,
      question: card.romanji,
      answer: card.meaning
    }
  })
  const [flashcards, setFlashcards] = useState(defaultFlashCard)


  function AddTopic(e){
    e.preventDefault();
    const cateEl = document.querySelector("#category");
    setFlashcards(categories[cateEl.selectedIndex].cards.map((card)=>{
      return {
        id:`${Math.random()}-${Date.now()}`,
        question: FCOption === 0? card.romanji : card.meaning,
        answer: FCOption === 0? card.meaning : card.romanji
      }
    }))
  }
  
  function OnChangeOption(e){
    e.preventDefault();
    const optEl = document.querySelector("#option");
    console.log(optEl.selectedIndex)
    setFCOption(optEl.selectedIndex);
  }

  function OnShuffle(e){
    e.preventDefault();
    const cateEl = document.querySelector("#category");
    const originCards = categories[cateEl.selectedIndex].cards;

    const shuffleCards = originCards.sort((a, b) => 0.5 - Math.random())

    setFlashcards(shuffleCards.map((card)=>{
      return {
        id:`${Math.random()}-${Date.now()}`,
        question: FCOption === 0? card.romanji : card.meaning,
        answer: FCOption === 0? card.meaning : card.romanji
      }
    }))
  }

  useEffect(()=>{
    const cateEl = document.querySelector("#category");
    setFlashcards(categories[cateEl.selectedIndex].cards.map((card)=>{
      return {
        id:`${Math.random()}-${Date.now()}`,
        question: FCOption === 0? card.romanji : card.meaning,
        answer: FCOption === 0? card.meaning : card.romanji
      }
    }))
  },[FCOption, categories]);
  
  return (
    <>
      <form className="header" onSubmit={AddTopic}>
        <div className="form-group">
          <label htmlFor="opt">Option</label>
          <select id="option" onChange={OnChangeOption}>
            <option value="japeng" key="0">Japanese-English</option>
            <option value="endjap" key="1">English-Japanese</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Topic</label>
          <select id="category" onChange={AddTopic}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group" onClick={OnShuffle}>
          <button className="btn">Shuffle</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
