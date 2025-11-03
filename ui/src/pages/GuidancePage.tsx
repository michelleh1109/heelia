import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

const guidanceCopy: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  exercise: {
    title: 'Exercise prescription',
    sections: [
      {
        heading: 'Power and impact',
        body:
          'Integrate 2 sessions of plyometric or weighted power work weekly. Focus on kettlebell swings, trap-bar deadlifts, and step-downs to stimulate osteogenesis.'
      },
      {
        heading: 'Balance & stability',
        body:
          'Layer single-leg reaches, Bosu holds, and perturbation training to reduce fall risk. Aim for 10 minutes daily sprinkled between other sessions.'
      },
      {
        heading: 'Recovery metrics',
        body:
          'Monitor HRV and soreness to modulate load. Keep RPE between 6-7 on lifting days and add restorative mobility when HRV drops >10%.'
      }
    ]
  },
  nutrition: {
    title: 'Nutrition strategy',
    sections: [
      {
        heading: 'Calcium cadence',
        body:
          'Distribute 1200mg of calcium across meals with dairy, leafy greens, chia, and sesame. Pair with vitamin C-rich foods for better absorption.'
      },
      {
        heading: 'Protein targets',
        body:
          'Hit 1.2-1.4g/kg of body weight using lean proteins, collagen peptides, and legumes to support bone matrix turnover.'
      },
      {
        heading: 'Micronutrient density',
        body:
          'Prioritize magnesium, potassium, and omega-3 fatty acids with nuts, seeds, and cold-water fish. Log intake in the Heelia app to track trends.'
      }
    ]
  },
  supplements: {
    title: 'Supplement roadmap',
    sections: [
      {
        heading: 'D3 + K2 synergy',
        body:
          'Take 2000 IU D3 alongside 100mcg MK-7 form K2 to guide calcium to bone tissue and away from vasculature.'
      },
      {
        heading: 'Collagen peptides',
        body:
          'Add 10g hydrolyzed collagen 30 minutes prior to loading sessions to prime connective tissue and bone remodeling.'
      },
      {
        heading: 'Baseline labs',
        body:
          'Recheck 25(OH)D, ferritin, and hsCRP every 6 months to personalize dosing and ensure there is no silent inflammation.'
      }
    ]
  }
};

export function GuidancePage() {
  const { topic } = useParams();
  const guidance = useMemo(() => (topic ? guidanceCopy[topic] : undefined), [topic]);

  if (!guidance) {
    return (
      <section className="panel">
        <div className="panel-heading">
          <h2>Protocol not found</h2>
          <p>Select a guidance card from the dashboard to view details.</p>
        </div>
        <Link to="/dashboard" className="ghost">
          Back to dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>{guidance.title}</h2>
          <p>High-signal tactics tailored to the most recent scan performance.</p>
        </div>
        <Link to="/dashboard" className="ghost">
          ← Dashboard
        </Link>
      </div>
      <div className="guidance-content">
        {guidance.sections.map((section) => (
          <article key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
