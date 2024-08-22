import { Col, Row } from 'react-bootstrap';
import CategoryCard from '../ui/CategoryCard';

export default function MainPage({ categories, user }) {
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop:40
      }}>
        <h1>Всем привет</h1>
      </div>
      <Row>
        {categories.map((item) => (
          <Col key={item.id} lg={3} className="d-flex g-5">
            <CategoryCard item={item} user={user} />
          </Col>
        ))}
      </Row>
    </>
  );
}