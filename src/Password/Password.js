import React, { Component } from "react";
import "./Password.css";
import {
    DEFAULT_PASSWORD_LENGTH,
    SPECIAL_CHARACTER_RATIO,
    ALLOW_SPECIAL_CHARACTERS,
    ALLOW_UPPERCASE_LETTERS,
    ALLOW_NUMBERS,
    SPECIAL_CHARS,
    LETTERS,
    NUMBERS,
    UPPER_LETTERS
} from "./utils";

function generateRandomNumber(min, max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectSubSet(charset, length) {
    if (!Array.isArray(charset)) {
        throw new TypeError(
            `charset must be an array, given ${typeof charset}`
        );
    }

    const subSet = [];

    for (let i = 0; i < length; i += 1) {
        const randomNumber = generateRandomNumber(0, charset.length - 1);
        const letter = charset[randomNumber];
        subSet.push(letter);
    }

    return subSet;
}

class Password extends Component {
    state = {
        passwordLength: DEFAULT_PASSWORD_LENGTH,
        specialCharactersRatio: SPECIAL_CHARACTER_RATIO,
        includeSpecialCharacters: ALLOW_SPECIAL_CHARACTERS,
        includeUpperCaseLetters: ALLOW_UPPERCASE_LETTERS,
        allowNumbers: ALLOW_NUMBERS,
        letters: LETTERS,
        upperCaseLetters: UPPER_LETTERS,
        numbers: NUMBERS,
        specialChars: SPECIAL_CHARS,
        password: '',
    };

    generatePassword() {
        let subSet = [];
        const specialCharacters = Math.ceil(this.state.passwordLength * (this.state.specialCharactersRatio / 100));
        if(this.state.includeSpecialCharacters) {
            subSet = subSet.concat(selectSubSet(this.state.specialChars, specialCharacters));
        }

        let charSet = this.state.letters;
        

        if(this.state.includeUpperCaseLetters) {
            charSet = charSet.concat(this.state.upperCaseLetters);
        }
        if(this.state.allowNumbers) {
            charSet = charSet.concat(this.state.numbers);
        }

        subSet = subSet.concat(selectSubSet(charSet, this.state.passwordLength - specialCharacters));
        
        this.setState({password: selectSubSet(subSet, this.state.passwordLength).join('')});
    }

    copyToClipboard() {
        const textArea = document.getElementById('password').innerText;
        const input = document.createElement('textarea');
        input.innerHTML = textArea;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }

    render() {
        return (
            <div>
                <h2>Password Generator</h2>
                <div className="slider">
                    <label htmlFor="length">Password Length</label>
                    <input
                        type="range"
                        id="length"
                        name="length"
                        value={this.state.passwordLength}
                        onChange={(event) =>
                            this.setState({
                                passwordLength: event.target.value,
                            })
                        }
                        min="8"
                        max="32"
                    />
                    {this.state.passwordLength}
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="scales"
                        name="scales"
                        defaultChecked={this.state.allowNumbers}
                        onChange={(event) =>
                            this.setState({
                                allowNumbers: event.target.checked
                            })
                        }
                    />
                    <label htmlFor="scales">Include Number</label>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="special"
                        name="special"
                        defaultChecked={this.state.includeSpecialCharacters}
                        onChange={(event) =>
                            this.setState({
                                includeSpecialCharacters: event.target.checked,
                            })
                        }
                    />
                    <label htmlFor="special">Include special characters</label>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="upper"
                        name="upper"
                        defaultChecked={this.state.includeUpperCaseLetters}
                        onChange={(event) =>
                            this.setState({
                                includeUpperCaseLetters: event.target.checked,
                            })
                        }
                    />
                    <label htmlFor="upper">Include Upper case letter</label>
                </div>
                <div className="slider">
                    <label htmlFor="ratio">
                        Percentage of Special Characters
                    </label>
                    <input
                        type="range"
                        id="ratio"
                        value={this.state.specialCharactersRatio}
                        onChange={(event) =>
                            this.setState({
                                specialCharactersRatio: event.target.value,
                            })
                        }
                        name="ratio"
                        min="10"
                        max="100"
                    />
                    {this.state.specialCharactersRatio}
                </div>
                <button onClick={() => this.generatePassword()}>
                    Generate Password
                </button>
                {
                    this.state.password ? (
                        <h2 className="generated-password">
                            <span id="password">{this.state.password}</span>
                            <div className="copy-icon" onClick={() => this.copyToClipboard()}></div>
                        </h2>)
                        : ''
                }
            </div>
        );
    }
}

Password.propTypes = {};

export default Password;
