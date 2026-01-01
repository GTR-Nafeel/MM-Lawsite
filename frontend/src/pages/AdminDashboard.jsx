import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import StatCard from '../components/StatCard'; // Adjust the import path as necessary

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin-dashboard/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load admin data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" className="m-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={6}>
          <StatCard title="Your Assigned Cases" value={stats?.assigned_cases || 0} color="primary" />
        </Col>
        <Col md={6}>
          <StatCard title="Pending Documents" value={stats?.pending_documents || 0} color="danger" />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
