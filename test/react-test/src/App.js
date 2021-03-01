import FirstComponent from './first-component';
import SecondComponent from './second-component';
import ThirdComponent from './third-component';


export default function App() {

  const data = {
    filters: {
      'Star rating': [
        { name: '1 star', checked: false },
        { name: '2 stars', checked: false },
        { name: '3 stars', checked: false },
        { name: '4 stars', checked: false },
        { name: '5 stars', checked: true }
      ],
      'Property type': [
        { name: 'Apartments', checked: false },
        { name: 'Hotels', checked: false },
        { name: 'Hostels', checked: false }
      ]
    },
    hotels: [
      {
        name: 'Hotel des Vosges',
        description:
          'Located in the 20th district of Paris, just 700 metres from Père Lachaise Cemetery, Hotel des Vosges offers a 24-hour reception and free Wi-Fi access.',
        imageURL:
          'https://s-ec.bstatic.com/xdata/images/hotel/square600/13072445.webp?k=9c12bda1f8c02f76fa0ea4a6ea00e6f7074753025bc0c187f7b6fc3076343401&o='
      },
      {
        name: 'We Loft',
        description:
          'We Loft is a property set in Paris near Opéra Bastille. This bed and breakfast also has free WiFi.',
        imageURL:
          'https://t-ec.bstatic.com/xdata/images/hotel/square600/96299078.webp?k=1ab1cd2966b00e21df37c28b1fed925f86da5a8834bacf06509397d26ffa8f26&o='
      },
      {
        name: 'Citadines Saint-Germain-des-Prés Paris',
        description:
          'In the center of Paris, Citadines Saint-Germain-des-Prés Paris is a 10-minute walk from Notre-Dame Cathedral and 293 m from Saint-Michel Metro Station. It features a fitness room and free Wi-Fi access.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/239/239424439.jpg'
      },
      {
        name: 'Hipotel Paris Gambetta République',
        description:
          'Located 500 metres from Père Lachaise Cemetery and 300 metres from Place Gambetta, Hipotel Gambetta offers en suite rooms with a flat-screen TV and a private bathroom.',
        imageURL:
          'https://t-ec.bstatic.com/xdata/images/hotel/square600/45324268.webp?k=deb5c9732389dbe8e7411602b3b83cbb32d4c57b8c7842621d7d085fb2a4c9db&o='
      },
      {
        name: 'Four Seasons Hotel George V Paris',
        description:
          'Just steps from the Champs-Elysées, on the Georges V Avenue, Four Seasons Hotel George V features private terraces with commanding Paris city views, signature lavish flower displays imagined by Jeff Leatham, top-of-the-line spa treatments and Michelin-awarded dining.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/232/232783611.jpg'
      },
      {
        name: 'Hotel Lutetia',
        description:
          'Hotel Lutetia is an iconic luxury hotel located in the Saint-Germain-des-Prés area. Located on the Left Bank of the River Seine, it is a 5-minute walk from le Bon Marché Department Store and 1.2 mi from the Louver Museum.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/194/194457472.jpg'
      },
      {
        name: 'Le Meurice – Dorchester Collection',
        description:
          'Le Meurice is a hotel palace located in central Paris. It offers a 2-star Michelin restaurant as well as a spa and a fitness center with massage treatments.Decorated in a 18th century style, with Louis XVI furniture, aach air-conditioned and soundproofed room has a classic decor with a modern twist and a marble bathroom.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/214/214455174.jpg'
      },
      {
        name: 'Shangri-La Hotel, Paris',
        description:
          'A former residence of Prince Roland Bonaparte and listed in the French “Monuments Historiques”, Shangri-La Hotel, Paris is a hotel palace located across the Seine and facing the Eiffel Tower. It reflects both Asian hospitality and French art de viver. It has 2 restaurants and 1 of which has a Michelin star. An indoor pool and a spa are featured.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/165/16537993.jpg'
      },
      {
        name: 'Elysées Ceramic',
        description:
          'This Art Nouveau-style hotel is just a 5-minute walk from Avenue Champs Elysées. Centrally located near the main sights, it offers a 24-hour reception. A flat-screen TV with satellite channels and a mini-bar are in all of the rooms at Elysées Ceramic. The rooms are decorated in a contemporary style with printed wallpaper and have access to the hotel’s WiFi connection.',
        imageURL:
          'https://t-cf.bstatic.com/images/hotel/max1024x768/280/280887830.jpg'
      },
    ]
  };

  return (
    <div className="App-container">
      <header className="App-header">
        <h1>Hotel Booking</h1>
        <h2>Hotel List</h2>
      </header>
      <div className="container">
        <div className="side-container">
          <FirstComponent starArray={data.filters['Star rating']}/>
          <SecondComponent typeArray={data.filters['Property type']} />
        </div>
        <main>
          <ThirdComponent hotellist={data.hotels} />
        </main>
      </div>
    </div>
  );
}
