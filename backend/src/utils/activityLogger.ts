import { Activity, ActivityType } from "../models/Activity";

export async function logActivity(
  type: ActivityType,
  description: string,
  email?: string
) {
  try {
    const activityData: { type: ActivityType; description: string; email?: string } = {
      type,
      description,
    };
    if (email) {
      activityData.email = email;
    }
    await Activity.create(activityData);
  } catch (err) {
    // On ne bloque pas le flux métier si le log échoue
    console.error("Échec de journalisation d'activité", err);
  }
}

