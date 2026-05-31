import { useState } from "react"
import styled from "styled-components"

const DeleteModal = ({ guestbook, onClose, onSuccess }) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleDelete = async () => {
        setError('')

        try {
            const response = await fetch(
                `http://13.125.251.189:8000/api/guestbooks/${guestbook.id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                }
            )

            if(response.ok) {
                onSuccess()
            }
            else {
                setError('다른 트레이너의 포켓몬입니다')
            }
        } catch(err) {
            console.error('에러: ', err)
            setError('오류 발생')
        }
    }

    return(
        <Overlay>
            <ModalContent>
                <h2>포켓몬을 데리고 간다</h2>
                <p>{guestbook.author}님의 포켓몬을 데리고 가겠습니까?</p>

                <label>
                    비밀번호
                    <input
                        type="password"
                        maxLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <ButtonGroup>
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleDelete}>데리고 간다</button>
                </ButtonGroup>
            </ModalContent>
        </Overlay>
    )
}

export default DeleteModal

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
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h2 {
    margin: 0;
    font-size: 18px;
    }

    p {
    margin: 0;
    color: #666;
    font-size: 14px;
    }

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
`

const ErrorMessage = styled.div`
    color: #d32f2f;
    font-size: 13px;
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
        color: #333;
    }

    &:last-child {
        background: #d32f2f;
        color: white;
    }
    }
`