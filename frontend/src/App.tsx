import { useEffect, useState } from "react";

interface Activity {
  _id: string;
  title: string;
  durationMin: number;
  completed: boolean;
}

interface Day {
  _id: string;
  weekday: string;
  activities: Activity[];
}

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDays() {
      try {
        const res = await fetch("/api");
        if (!res.ok) {
          throw new Error("Failed to fetch days");
        }

        const data = await res.json();
        setDays(data);
      } catch (err) {
        console.log(err);
        setError("Erro ao carregar dados do servidor");
      } finally {
        setLoading(false);
      }
    }

    fetchDays();
  }, []);

  if (loading) return <p>Carregando…</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Atividades da Semana</h1>

      {days.map((day) => (
        <section key={day._id} style={{ marginBottom: "1.5rem" }}>
          <h2>{day.weekday}</h2>

          {day.activities.length === 0 ? (
            <p>Nenhuma atividade</p>
          ) : (
            <ul>
              {day.activities.map((activity) => (
                <li key={activity._id}>
                  {activity.title} — {activity.durationMin} min
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}

export default App;
