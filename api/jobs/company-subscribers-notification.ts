import { User } from '@prisma/client';
import { CronJob } from 'cron';
import templates from '../consts/email';
import prisma from '../lib/prisma';
import { Email } from '../services';
import addMinutes from '../utils/add-minutes';
import { compareDates } from '../utils/compare-dates';

const scheduleCompanySubscribersNotification = (tickDate: Date, eventId: number) => {
  const now = new Date();

  if (compareDates(tickDate, now) !== 1) {
    tickDate = addMinutes(now, 1);
  }

  new CronJob(
    tickDate,
    async () => {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { company: { include: { subscribers: { include: { user: true } } } } },
      });

      if (!event || !event.company.subscribers.length) {
        return;
      }

      const { publishDate, name: eventName } = event;
      const companyName = event.company.name;
      const subscribers = event.company.subscribers.map((subscriber) => subscriber.user);

      if (compareDates(publishDate, now) !== 1 || !compareDates(tickDate, publishDate)) {
        // if publishDate in the past or tickDate === publishDate
        notifyCompanySubscribers(companyName, eventName, subscribers);
      }
    },
    null,
    true,
  );
};

const notifyCompanySubscribers = async (
  companyName: string,
  eventName: string,
  subscribers: User[],
) => {
  subscribers.forEach((subscriber) => {
    Email.sendMail(subscriber.email, templates.EVENT_PUBLISHED, {
      eventName,
      companyName,
    });
  });
};

export { scheduleCompanySubscribersNotification };
