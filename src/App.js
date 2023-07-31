// src/App.js
import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ga4 from 'react-ga4'

const App = () => {
  const [formName, setFormName] = useState('')
  const [blocks, setBlocks] = useState([{ id: 1, field1: '', field2: '' }])

  const handleFormNameChange = (e) => {
    setFormName(e.target.value)
  }

  const handleAddBlock = () => {
    const newBlock = { id: blocks.length + 1, field1: '', field2: '' }
    setBlocks([...blocks, newBlock])
  }

  const handleRemoveBlock = () => {
    setBlocks(blocks.slice(0, -1))
  }

  const handleChange = (id, field, value) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, [field]: value } : block
    )
    setBlocks(updatedBlocks)
  }

  const handleSubmit = () => {
    if (formName.trim().length === 0) {
      return
    }
    const formData = {}
    formData[formName] = {}

    blocks.forEach((block) => {
      formData[formName][block.field1] = block.field2
    })

    const [[eventName, eventBody]] = Object.entries(formData)

    console.log(eventName, eventBody)
    setFormName('')
    setBlocks([{ id: 1, field1: '', field2: '' }])
  }

  return (
    <Container className="mt-4">
      <input
        type="text"
        value={formName}
        onChange={handleFormNameChange}
        placeholder="Название ивента"
        className="form-control mb-2"
      />
      {blocks.map((block) => (
        <div className="mt-4" key={block.id}>
          <input
            type="text"
            value={block.field1}
            onChange={(e) => handleChange(block.id, 'field1', e.target.value)}
            placeholder="key"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={block.field2}
            onChange={(e) => handleChange(block.id, 'field2', e.target.value)}
            placeholder="value"
            className="form-control mb-2"
          />
        </div>
      ))}
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleAddBlock}>
            Добавить блок
          </Button>
        </Col>
        <Col className="text-end">
          {blocks.length > 1 && (
            <Button variant="danger" onClick={handleRemoveBlock}>
              Удалить последний блок
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="mt-3" variant="success" onClick={handleSubmit}>
            Отправить
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App
