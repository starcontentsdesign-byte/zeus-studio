const studioImages = [
  {
    id: 1,
    url: '/images/studio/studio1.png',
    alt: 'ZEUS studio entrance',
    size: 'large',
  },
  {
    id: 2,
    url: '/images/studio/studio2.jpg',
    alt: 'ZEUS recording room',
    size: 'medium',
  },
  {
    id: 3,
    url: '/images/studio/zeusstudio3.png',
    alt: 'ZEUS lounge',
    size: 'medium',
  },
  {
    id: 4,
    url: '/images/studio/studio4.jpg',
    alt: 'ZEUS booth lighting',
    size: 'medium',
  },
  {
    id: 5,
    url: '/images/studio/zeusstudio1.png',
    alt: 'ZEUS control room',
    size: 'medium',
  },
  {
    id: 6,
    url: '/images/studio/studio6.jpg',
    alt: 'ZEUS mix room',
    size: 'medium',
  },
];

export default function StudioSection() {
  return (
    <section id="studio" className="zeus-section zeus-studio-section">
      <div className="zeus-section-shell zeus-studio-shell">
        <div className="zeus-section-intro zeus-section-intro--lined">
          <h2 className="zeus-section-heading">Studio</h2>
        </div>

        <div className="zeus-studio-grid">
          {studioImages.map((image) => (
            <div
              key={image.id}
              className={`zeus-studio-card zeus-studio-card--${image.size}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="zeus-studio-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
