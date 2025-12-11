import { Activity, ActivityType } from "../models/Activity";

export async function logActivity(
  type: ActivityType,
  description: string,
  email?: string
) {
  try {
    await Activity.create({ type, description, email });
  } catch (err) {
    // On ne bloque pas le flux métier si le log échoue
    console.error("Échec de journalisation d'activité", err);
  }
}
