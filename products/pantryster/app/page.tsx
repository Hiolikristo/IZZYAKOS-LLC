const pillars = [
  ["Find Food", "Locate verified pantry resources near you and see when information was last updated."],
  ["Find Shelter", "See shelter and coordinated-access information without presenting stale data as live availability."],
  ["Transportation", "Surface COTA-accessible resources, transit assistance and delivery alternatives."],
  ["Senior Delivery", "Request support for seniors and people with mobility barriers."],
  ["Volunteer", "Match community volunteers to verified tasks by service area and capability."],
  ["Partners & Donors", "Give verified organizations and supporters a structured way to participate."],
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="brandText">
            <span className="eyebrow">COLUMBUS, OHIO PILOT</span>
            <strong>PANTRYSTER</strong>
            <span className="tagline">Tech That Feeds, Helping Hands and Uplifting Lives.</span>
          </div>
        </div>
        <nav>
          <a href="#resources">Resources</a>
          <a href="#help">Request Help</a>
          <a href="#partners">Partners</a>
          <a href="#volunteer">Volunteer</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">Community resource infrastructure</span>
          <h1>Find the help that is actually reachable.</h1>
          <p className="lede">
            Pantryster is being built to coordinate food, shelter, transportation,
            volunteer support and community resources around the realities people face:
            distance, timing, mobility and changing availability.
          </p>
          <div className="actions">
            <a className="primary" href="#resources">Find resources</a>
            <a className="secondary" href="#help">Request help</a>
          </div>
        </div>
        <aside className="statusCard">
          <span>Production baseline 0.1</span>
          <h2>Truth-first resource status</h2>
          <p>
            A resource is not shown as “live” unless a verified source has updated it.
            Every operational status is designed to carry a timestamp and verification state.
          </p>
        </aside>
      </section>

      <section id="resources" className="section">
        <div className="sectionHead">
          <span className="eyebrow">What Pantryster coordinates</span>
          <h2>One access layer for fragmented community support.</h2>
        </div>
        <div className="grid">
          {pillars.map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div>
          <span className="eyebrow">2-mile local-first model</span>
          <h2>Distance is part of eligibility in real life.</h2>
          <p>
            The production data model supports latitude/longitude, service radius,
            transit-access flags, delivery options and verification timestamps so the
            platform can eventually answer “what can I actually reach from here?”
          </p>
        </div>
      </section>

      <section id="help" className="section twoCol">
        <div>
          <span className="eyebrow">Assistance workflow</span>
          <h2>From need to a verified next action.</h2>
        </div>
        <ol className="steps">
          <li>Identify the need and location.</li>
          <li>Find verified nearby resources.</li>
          <li>Check transportation or delivery barriers.</li>
          <li>Route to partner, volunteer or follow-up support.</li>
          <li>Track outcome without exposing sensitive requests publicly.</li>
        </ol>
      </section>

      <section id="partners" className="section">
        <div className="callout">
          <span className="eyebrow">Partner infrastructure</span>
          <h2>Built for organizations to update their own operational truth.</h2>
          <p>
            Pantries, shelters, churches, libraries, nonprofits and public-service partners
            will be able to claim verified profiles, update hours and availability, publish
            alerts and manage service details.
          </p>
        </div>
      </section>

      <section id="volunteer" className="section">
        <div className="grid three">
          <article className="card"><h3>Volunteer</h3><p>Service area, availability, delivery capability and verification.</p></article>
          <article className="card"><h3>Donate</h3><p>Food, transit assistance, technology, logistics and sponsor support.</p></article>
          <article className="card"><h3>Partner</h3><p>Verified organization onboarding and controlled status updates.</p></article>
        </div>
      </section>

      <footer>
        <strong>PANTRYSTER</strong>
        <span>Columbus, Ohio pilot • IZZYAKOS LLC product pipeline</span>
      </footer>
    </main>
  );
}
