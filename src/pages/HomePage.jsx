import { useState, useEffect } from 'react'
import BoxGrid from '../components/BoxGrid'
import DetailCard from '../components/DetailCard'
import CreateModal from '../components/CreateModal'
import DeleteModal from '../components/DeleteModal'
import bgImage from '../assets/background.jpeg'
import styled from 'styled-components'

const HomePage = () => {
  const [guestbooks, setGuestbooks] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [currentBox, setCurrentBox] = useState(0)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const loadGuestbooks = () => {
    fetch('http://13.125.251.189:8000/api/guestbooks/')
      .then(response => response.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.id - b.id)
        setGuestbooks(sorted)
      })
  }

  useEffect(() => {
    loadGuestbooks()
  }, [])

  const selectedGuestbook = guestbooks.find(g => g.id === selectedId)

  const currentBoxGuestbooks = guestbooks.slice(currentBox * 30, (currentBox + 1) * 30)

  return(
    <Page>
      <Container>
        <Title>유진, 준원의 PC</Title>
        <MainArea>
          <LeftArea>
            <DetailCard guestbook={selectedGuestbook} />

            <ActionButton
              onClick={() => setIsCreateOpen(true)}
            >
              맡긴다
            </ActionButton>
            <ActionButton
              onClick={() => setIsDeleteOpen(true)}
              disabled={!selectedGuestbook}
            >
              데리고 간다
            </ActionButton>
          </LeftArea>

          <BoxGrid
            guestbooks={currentBoxGuestbooks}
            selectedId={selectedId}
            onSelect={setSelectedId}
            currentBox={currentBox}
            onPrevBox={() => {
              setCurrentBox(prev => (prev - 1 + 5) % 5)
              setSelectedId(null)
            }}
            onNextBox={() => {
              setCurrentBox(prev => (prev + 1) % 5)
              setSelectedId(null)
            }}
          />
        </MainArea>
      </Container>

      {isCreateOpen && (
        <CreateModal
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => {
            setIsCreateOpen(false)
            loadGuestbooks()
          }}
        />
      )}

      {isDeleteOpen && selectedGuestbook && (
        <DeleteModal
          guestbook={selectedGuestbook}
          onClose={() => setIsDeleteOpen(false)}
          onSuccess={() => {
            setIsDeleteOpen(false)
            setSelectedId(null)
            loadGuestbooks()
          }}
        />
      )}
    </Page>
  )
}

export default HomePage

const Page = styled.div`
    min-height: 100vh;
    background-image: url(${bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 40px 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`

const Title = styled.h1`
    font-size: 24px;
    color: #faf3e0;
    -webkit-text-stroke: 4px #343a40;
    paint-order: stroke fill;
`

const MainArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
`

const LeftArea = styled.div`
    width: 250px;
    height: 474px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const ActionButton = styled.button`
    padding: 12px;
    font-size: 14px;
    font-weight: bold;
    background: #faf3e0;
    color: #343a40;
    border: 4px solid #343a40;
    border-radius: 8px;
    box-shadow: 
        inset 4px 4px 0 rgba(255, 255, 255, 0.5),
        inset -4px -4px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:disabled {
        background: #ccc;
        border: 4px solid #ccc;
        box-shadow: none;
        color: white;
        cursor: not-allowed;
    }
`