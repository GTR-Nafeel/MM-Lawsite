import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import StatCard from '../components/StatCard'; 
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" className="m-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Sidebar/>
      <Container className="py-4">
        <h2 className="mb-4">Welcome, {profile?.full_name || "User"}</h2>

        <Row>
          <Col md={4}>
            <StatCard title="My Documents" value={profile?.document_count || 0} color="info" />
          </Col>
          <Col md={4}>
            <StatCard title="Cases Involved" value={profile?.case_count || 0} color="success" />
          </Col>
          <Col md={4}>
            <StatCard title="Messages" value={profile?.message_count || 0} color="warning" />
          </Col>
        </Row>

        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Your Profile Info</h5>
            <p><strong>Username:</strong> {profile?.username}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Joined:</strong> {profile?.created_at}</p>
            <p><strong>Superuser:</strong> {profile?.is_superuser ? 'Yes' : 'No'}</p>
            <p><strong>Staff:</strong> {profile?.is_staff ? 'Yes' : 'No'}</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserDashboard;
