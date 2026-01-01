import { useEffect, useState } from 'react';
import { getSuperAdminDashboardData } from '../utils/api';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const StatCard = ({ title, value, color }) => (
  <Card className="mb-4 shadow-sm border-0">
    <Card.Body>
      <h6 className="text-muted">{title}</h6>
      <h3 className={`text-${color}`}>{value}</h3>
    </Card.Body>
  </Card>
);

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuperAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found.');
          setLoading(false);
          return;
        }
        console.log('Calling getSuperAdminDashboardData with token:', token);
        const data = await getSuperAdminDashboardData(token);
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching superadmin dashboard data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchSuperAdminData();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" className="m-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Super Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <StatCard title="Total Users" value={stats?.total_users || 0} color="primary" />
        </Col>
        <Col md={4}>
          <StatCard title="Active Admins" value={stats?.active_admins || 0} color="success" />
        </Col>
        <Col md={4}>
          <StatCard title="Documents Uploaded" value={stats?.total_documents || 0} color="warning" />
        </Col>
      </Row>

      {/* Add more rows/cards below as needed */}
    </Container>
  );
};

export default SuperAdminDashboard;
