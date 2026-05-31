import styled from "styled-components"
import { characterImages } from "../utils/characters"
import box1 from '../assets/Box_1.png'
import box2 from '../assets/Box_2.png'
import box3 from '../assets/Box_3.png'
import box4 from '../assets/Box_4.png'
import box5 from '../assets/Box_5.png'

const BOX_BACKGROUNDS = [
    box1,
    box2,
    box3,
    box4,
    box5,
]

const BoxGrid = ({ guestbooks, selectedId, onSelect, currentBox, onPrevBox, onNextBox }) => {
    return(
        <BoxWrapper>
            <BoxHeader>
                <ArrowButton onClick={onPrevBox}>
                    ◀
                </ArrowButton>
                <BoxName>박스 {currentBox + 1}</BoxName>
                <ArrowButton onClick={onNextBox}>
                    ▶
                </ArrowButton>
            </BoxHeader>

            <GridContainer $background={BOX_BACKGROUNDS[currentBox]}>
                {Array.from({ length: 30 }).map((_, index) => {
                    const guestbook = guestbooks[index]
                    const isSelected = guestbook && guestbook.id === selectedId

                    return(
                        <Slot
                            key={index}
                            onClick={() => guestbook && onSelect(guestbook.id)}
                            $isSelected={isSelected}
                            $hasGuestbook={!!guestbook}
                        >
                            {guestbook && (
                                <CharacterImage src={characterImages[guestbook.character]} alt="" />
                            )}
                        </Slot>
                    )
                })}
            </GridContainer>
        </BoxWrapper>
    )
}

export default BoxGrid

const GridContainer = styled.div`
    width: 530px;
    height: 400px;
    padding: 0 26px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    background-image: url(${props => props.$background});
    background-size: cover;
    background-repeat: no-repeat;
    border: 4px solid #343a40;
    border-radius: 8px;
`

const Slot = styled.div`
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: transform 0.15s;

    &:hover {
        transform: ${props => props.$hasGuestbook ? 'scale(1.1)' : 'none'};
    }
`

const CharacterImage = styled.img`
    width: 70%;
    height: 70%;
    object-fit: contain;
`

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const BoxHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 530px;
    gap: 12px;
`

const ArrowButton = styled.button`
    height: 100%;
    background: #ced4da;
    border: 4px solid #343a40;
    border-radius: 8px;
    box-shadow: 
        inset 4px 4px 0 rgba(255, 255, 255, 0.5),
        inset -4px -4px 0 rgba(0, 0, 0, 0.2);
    padding: 14px 16px;
    font-size: 20px;
    cursor: pointer;
    color: #333;
`

const BoxName = styled.span`
    background: #ced4da;
    border: 4px solid #343a40;
    border-radius: 8px;
    box-shadow: 
        inset 4px 4px 0 rgba(255, 255, 255, 0.5),
        inset -4px -4px 0 rgba(0, 0, 0, 0.2);
    padding: 14px 24px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    flex: 1;
    text-align: center;
`