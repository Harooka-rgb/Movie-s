import React from 'react';
import { Modal, Button, Space, Empty } from 'antd';
import { PlayCircleFilled, CloseOutlined } from '@ant-design/icons';

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

interface TrailerModalProps {
  visible: boolean;
  videos: Video[];
  onClose: () => void;
  title: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ visible, videos, onClose, title }) => {
  const trailers = videos.filter(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const mainTrailer = trailers.length > 0 ? trailers[0] : null;

  return (
    <Modal
      title={`Трейлер: ${title}`}
      open={visible}
      onCancel={onClose}
      width={900}
      footer={[
        <Button key="close" onClick={onClose}>
          Закрыть
        </Button>,
      ]}
      bodyStyle={{ padding: 0, background: '#000' }}
    >
      {mainTrailer ? (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            title={mainTrailer.name}
            src={`https://www.youtube.com/embed/${mainTrailer.key}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : (
        <Empty
          description="Трейлер не найден"
          style={{ padding: '50px 0', color: '#fff' }}
          imageStyle={{ filter: 'invert(1)' }}
        />
      )}

      {trailers.length > 1 && (
        <div style={{ padding: '20px', background: '#000', borderTop: '1px solid #444' }}>
          <p style={{ color: '#fff', marginBottom: '10px' }}>Другие трейлеры:</p>
          <Space wrap>
            {trailers.map((trailer) => (
              <a
                key={trailer.id}
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <PlayCircleFilled style={{ fontSize: '14px' }} />
                {trailer.name}
              </a>
            ))}
          </Space>
        </div>
      )}
    </Modal>
  );
};

export default TrailerModal;
