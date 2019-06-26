import styled from 'styled-components';

export const Input = styled.input`
      width: 100%;
      padding: 16px 16px 16px 60px;
      font-size: 24px;
      border: none;
      background: rgba(0, 0, 0, 0.003);
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
      &::placeholder{
        color: #e6e6e6;
      }
    `;
export const SemanticHeader = styled.header`
  text-align: center;
`;
export const Title = styled.h1`
  position: absolute;
  top: -180px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  color: rgba(175, 47, 47, 0.15);
`;