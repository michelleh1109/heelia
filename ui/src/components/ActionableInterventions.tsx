import { Link } from 'react-router-dom';

export interface Intervention {
  id: string;
  title: string;
  description: string;
  focus: 'nutrition' | 'exercise' | 'supplements';
  badge: string;
}

interface ActionableInterventionsProps {
  interventions: Intervention[];
}

const focusToAccent: Record<Intervention['focus'], string> = {
  nutrition: 'mint',
  exercise: 'peach',
  supplements: 'gold'
};

export function ActionableInterventions({ interventions }: ActionableInterventionsProps) {
  return (
    <section className="panel interventions">
      <div className="panel-heading">
        <div>
          <h2>Actionable next steps</h2>
          <p>Curated guidance to reinforce bone remodeling and functional strength.</p>
        </div>
      </div>
      <div className="intervention-grid">
        {interventions.map((item) => (
          <article key={item.id} className={`intervention-card accent-${focusToAccent[item.focus]}`}>
            <span className="intervention-badge">{item.badge}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link to={`/guidance/${item.focus}`} className="ghost">
              View protocol →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
