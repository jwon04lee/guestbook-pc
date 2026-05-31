import styled from "styled-components"
import { characterImages } from "../utils/characters"

const formatDate = (isoString) => {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hour}:${minute}`
}

const DetailCard = ({ guestbook }) => {
    if(!guestbook) {
        return(
            <Card>
                <EmptyMessage>
                    포켓몬을 클릭해서<br />
                    메시지를 확인해보세요!
                </EmptyMessage>
            </Card>
        )
    }

    return(
        <Card>
            <CharacterImage>
                <img src={characterImages[guestbook.character]} alt="포켓몬" />
            </CharacterImage>
            <Author>{guestbook.author}</Author>
            <Title>{guestbook.title}</Title>
            <Content>{guestbook.content}</Content>
            <DateText>{formatDate(guestbook.created_at)}</DateText>
        </Card>
    )
}

export default DetailCard

const Card = styled.div`
    flex: 1;
    padding: 20px;
    padding-top: 30px;
    background: #faf3e0;
    border: 4px solid #343a40;
    border-radius: 8px;
    box-shadow: 
        inset 4px 4px 0 rgba(255, 255, 255, 0.5),
        inset -4px -4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const EmptyMessage = styled.p`
    margin: auto;
    text-align: center;
    color: #888;
    font-size: 14px;
    line-height: 1.6;
`

const CharacterImage = styled.div`
    align-self: center;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const Author = styled.h2`
    font-size: 16px;
    color: #666;
`

const Title = styled.h3`
    font-size: 13px;
    color: #333;
`

const Content = styled.p`
    flex: 1;
    font-size: 14px;
    color: #444;
    line-height: 1.6;
    overflow-wrap: break-word;
`

const DateText = styled.p`
    font-size: 11px;
    color: #999;
    text-align: right;
`