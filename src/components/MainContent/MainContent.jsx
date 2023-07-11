import styled from 'styled-components'

export const GalleryContainer = styled.div`
padding: auto;
width: 100%;
display: flex;
grid-template-rows: 1fr;
flex-direction: column;
align-items: center;
border-radius: 10px;
margin-top: .5rem;
margin-bottom: .5rem;
position: relative;
margin-left: 8rem;
background-color: rgba(0,0,0,0.09);
padding: 1rem 0;
border: 2px solid

`

export const MainImageWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.09);
border-radius: 15px;
width:80%;
position: relative;
`



export const MainImage = styled.img`
border: 2px solid red;
height: 100%;
position: relative;
width: 100%;
border-radius: 15px;
`

export const ThumbnailWrapper = styled.div`
width:70%;
display: flex;
flex-direction: row;
border: 2px solid;
border-radius: 15px;
margin-top: 1rem;
justify-content: center;
align-items: center;
gap: 5px;
padding: 0 8rem;
background-color: rgba(0,0,0,0.07);

@media screen and (max-width:1380px) {
    width: 75%;
    gap: 10px;
 }

 @media screen and (max-width:980px) {
    width: 65%;
 }

 @media screen and (max-width:800px) {
    width: 55%;
 }
`

export const ThumbnailContainer = styled.div`
display: grid;
grid-template-columns: repeat(8, auto);
align-items: center;
justify-content: center;
border-radius: 15px;


@media screen and (max-width:1380px) {
    grid-template-columns: repeat(7, auto);
 }

 @media screen and (max-width:980px) {
    grid-template-columns: repeat(5, auto);
 }

 @media screen and (max-width:800px) {
    grid-template-columns: repeat(3, auto); }
`

export const FilterContainer = styled.div`
position: absolute;
display: flex;
flex-direction: column;
max-width: 9rem;
left: 3rem;
top: 3rem;



 @media screen and (max-width:980px) {
    left: 1rem;
 }

 @media screen and (max-width:800px) {
    left: 0rem;
 }
`

export const FilterWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: 2px solid;
border-radius: 15px;
padding: 1rem 0;
background-color: rgba(0,0,0,0.07);
`

export const MainContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
justify-self: center;
margin: 0 7rem;
`

export const ThemeButton = styled.button`
width: 6rem;
max-height: auto;
margin: 0 2rem;
align-self: center;
border-radius: 20px;
padding: 5%;
font-size: .7rem;
border: none;
cursor: pointer;
margin-bottom: 2rem;
position: relative;

&:hover {
    background-color: grey;
    color: white;
}
`

export const DrawButton = styled.button`
width: 6rem;
max-height: auto;
align-self: center;
border-radius: 15px;
padding: 7%;
font-size: .7rem;
border: none;
cursor: pointer;
margin-top: 2rem;

&:hover {
    background-color: dodgerBlue;
    color: #fff
}
`
export const PrevButton = styled.button`
width: 6rem;
min-height: 2rem;
min-width: 4rem;
align-self: center;
border-radius: 15px;
padding: .9%;
font-size: .7rem;
border: none;
cursor: pointer;

&:hover {
    background-color: white;
    color: #000
}
`
export const NextButton = styled.button`
min-height: 2rem;
min-width: 4rem;
align-self: center;
border-radius: 15px;
padding: .9%;
font-size: .7rem;
border: none;
cursor: pointer;

&:hover {
    background-color: white;
    color: #000
}
`