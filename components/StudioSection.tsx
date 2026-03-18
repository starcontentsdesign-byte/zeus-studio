import React from 'react';

export function StudioSection() {
  const studioImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAyNjQ0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Recording Studio Interior',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1613412207572-5bf376466f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzcwMjY0NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Studio Microphone',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1615268734097-12b6b02ca8ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMG1peGluZyUyMGNvbnNvbGV8ZW58MXx8fHwxNzcwMTQ1MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Mixing Console',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1762028892701-692dc360db08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkaW8lMjBib290aHxlbnwxfHx8fDE3NzAyNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Studio Booth',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1763407178461-2efa5726e241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBoZWFkcGhvbmVzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MDI2NDQxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Studio Headphones',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1599581248308-799fb3270594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzZXNzaW9uJTIwbXVzaWNpYW58ZW58MXx8fHwxNzcwMjY0NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Recording Session',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1763336339335-cfff67d3160f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMGVuZ2luZWVyJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDE5MTY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Engineer Workspace',
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1758336717046-c475fc6f45ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhY291c3RpYyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzAyNjQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Acoustic Treatment',
    },
  ];

  return (
    <section id="studio" className="relative min-h-screen bg-black py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12 text-center">Studio</h2>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {studioImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden ${
                index % 4 === 0 || index % 4 === 3 ? 'mt-0' : 'mt-8 md:mt-12'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
