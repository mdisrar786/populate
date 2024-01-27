import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';




const DataTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: 'Md Israr Ahmed', gender: 'Male', age: 25, class: 'frontend developer' }
    // // Add more initial data or fetch data from APIs
  ]);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    class: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: '',
      gender: '',
      age: '',
      class: '',
    });
    setValidationError('');
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddRow = () => {
    // Validate form fields
    if (!formData.name || !formData.gender || !formData.age || !formData.class) {
      setValidationError('All fields are required.');
      return;
    }

    const newRow = {
      id: data.length + 1,
      ...formData,
    };
    setData([...data, newRow]);
    handleClose();
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div>
     <div className='d-flex align-item-center justify-content-center'>
     <Button variant="success" onClick={handleShow}>
        Add Row <AddIcon/>
      </Button>
     </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.class}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRow(row.id)}>
                  Delete <DeleteIcon/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClass">
              <Form.Label>Class</Form.Label>
              <Form.Control
                as="select"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
              >
                <option value="">Select Class</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
