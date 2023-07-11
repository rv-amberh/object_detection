import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    font-family: 'Lato', sans-serif;
  }

  button {
    background-color: ${({ theme }) => theme.buttonbg};
    color: ${({ theme }) => theme.buttontxt};
  }

  .themeButton {
    background-color: ${({ theme }) => theme.themeBg};
  }

.filter {
  color: ${({ theme }) => theme.filterColor};
}

.checkboxHolder {
  color: ${({ theme }) => theme.filterColor};
}

.filterWrapper {
  border-color: ${({ theme }) => theme.borderColor};
}

.thumbnailWrapper {
  border-color: ${({ theme }) => theme.borderColor};
}

.mainContainer {
  border-color: ${({ theme }) => theme.borderColor};
}
`;

export const lightTheme = {
  body: 'white',
  text: 'rgba(0,0,0,0.8)',
  buttonbg: 'red',
  buttontxt: 'white',
  themeBg: 'black',
  gcBg: 'rgba(0,0,0,0.09)',
  filterColor: '#000',
  borderColor: 'rgba(0,0,0,0.07)'
};

export const darkTheme = {
  body: '#121620',
  text: '#f1f1f1',
  buttonbg: 'white',
  buttontxt: '#000',
  themeBg: 'white',
  gcBg: 'rgba(0,0,0, 0.99)',
  filterColor: '#fff',
  borderColor: 'white'
};