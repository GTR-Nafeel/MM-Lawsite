import { Card } from 'react-bootstrap';

const StatCard = ({ title, value, color }) => (
  <Card className="mb-4 shadow-sm border-0">
    <Card.Body>
      <h6 className="text-muted">{title}</h6>
      <h3 className={`text-${color}`}>{value}</h3>
    </Card.Body>
  </Card>
);

export default StatCard;
