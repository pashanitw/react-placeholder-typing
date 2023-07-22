//@ts-nocheck
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const typing = keyframes`
  from { width: 0 }
`;

const blinkCursor = keyframes`
  0% {border-right-color: rgba(255,255,255,.75);}
  50% {border-right-color: transparent;}
  100% {border-right-color: rgba(255,255,255,.75);}
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
`;

const StyledInput = styled.input`
  color: #f5f5f5;
  background: none;
  border: none;
  padding: 0 10px;
  width: 80%;
  outline: none;
  font-family: ${props => props.fontFamily || 'monospace'};
  font-size: 20px;
  &::placeholder {
    animation: ${typing} 2s steps(30, end), ${blinkCursor} .75s step-end infinite;
    overflow: hidden;
    white-space: nowrap;
    border-right: .1em solid;
  }
`;

const ReactTypingAnimation = ({placeholders=[], value='', onChange, renderIcon, fontFamily, containerStyle={}, inputStyle={}}) => {
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    let place = '';
    const typingInterval = setInterval(() => {
      if (place.length < placeholders[index].length) {
        place += placeholders[index][place.length];
        setPlaceholder(place);
      } else {
        clearInterval(typingInterval);
        const deletingInterval = setInterval(() => {
          if (place.length > 0) {
            place = place.slice(0, place.length - 1);
            setPlaceholder(place);
          } else {
            clearInterval(deletingInterval);
            setIndex((index + 1) % placeholders.length);
          }
        }, 100);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <InputWrapper style = {{...containerStyle}}>
      {renderIcon && renderIcon()}
      <StyledInput fontFamily={fontFamily} placeholder={placeholder} onChange={(e) => {
        onChange && onChange(e.target.value);
      }} value={value} style={{...inputStyle}}/>
    </InputWrapper>
  );
};

export default ReactTypingAnimation;
