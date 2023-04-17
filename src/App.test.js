import React from "react";
import { screen, render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Header from "./Header";
import EmojiResults from "./EmojiResults";
import emojiList from "./emojiList.json";

describe("Emoji listesini render testi.", () => {
  let emojiList, emojiInput, copyEmoji;
  beforeEach(() => {
    render(<App />);
    // json içerisinden ilk 10 item kopyalanır.
    emojiList = [...document.querySelectorAll(".emoji-item")].slice(0, 10);
    emojiInput = screen.getByLabelText('Emoji:');
    copyEmoji = screen.getByText('Joy');
  });

  test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
  });

  test("header render without crashing", () => {
    // Find by text Header
    const searchText = screen.getByText("Emoji Search");
    
    expect(searchText).toBeInTheDocument();
  });

  test("emoji list render without crashing", () => {
    // Get first 10 emoji then check are they in doc.
    emojiList = [...document.querySelectorAll(".emoji-item")].slice(0, 10);

    emojiList.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('emoji filter',()=>{
    // add emoji name to filter input then check
    const emojiName = 'Grin';
     fireEvent.click(emojiInput,emojiName);
    expect(screen.getByText(emojiName)).toBeInTheDocument();
  }) 

  test('emoji copy',()=>{
    // Click one emoji then check
    copyEmoji = screen.getByText('Smile');
    fireEvent.click(copyEmoji);
    expect(copyEmoji.parentElement.getAttribute('data-clipboard-text')).toMatch('😄');
  }) 

});
