import { useState } from "react"
import { characterImages } from "../utils/characters"
import styled from "styled-components"

const CreateModal = ({ onClose, onSuccess }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [password, setPassword] = useState('')
    const [character, setCharacter] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://13.125.251.189:8000/api/guestbooks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author,
                    title,
                    content,
                    password,
                    character,
                }),
            })

            if(response.ok) {
                onSuccess()
            } else {
                alert('맡기기 실패')
            }
        } catch(error) {
            console.error('에러: ', error)
            alert('오류 발생')
        }
    }

    return(
        <Overlay>
            <ModalContent>
                <h2>포켓몬을 맡긴다</h2>

                <label>
                    이름
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>

                <label>
                    제목
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    메시지
                    <input value={content} onChange={(e) => setContent(e.target.value)} />
                </label>

                <label>
                    비밀번호 (4자리)
                    <input
                        type="password"
                        maxLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div>
                    <label>스타팅 포켓몬</label>
                    <CharacterPicker>
                        {[1, 2, 3, 4, 5].map(num => (
                            <CharacterOption
                                key={num}
                                type="button"
                                $isSelected={character === num}
                                onClick={() => setCharacter(num)}
                            >
                                <img src={characterImages[num]} alt={`캐릭터 ${num}`} />
                            </CharacterOption>
                        ))}
                    </CharacterPicker>
                </div>

                <ButtonGroup>
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleSubmit}>맡긴다</button>
                </ButtonGroup>
            </ModalContent>
        </Overlay>
    )
}

export default CreateModal

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    color: #333;
    }

    input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    }

    textarea {
    min-height: 80px;
    resize: vertical;
    }
`

const CharacterPicker = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`

const CharacterOption = styled.button`
    flex: 1;
    aspect-ratio: 1;
    padding: 8px;
    background: white;
    border: 2px solid ${props => props.$isSelected ? '#343a40' : '#ccc'};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s;

    img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
    }

    &:hover {
    transform: scale(1.05);
    }
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 12px;

    button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;

    &:first-child {
        background: #eee;
        color: #343a40;
    }

    &:last-child {
        background: #faf3e0;
        color: #343a40;
    }
    }
`