import HttpError from '@wasp/core/HttpError.js'

export const createPartner = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { personality, appearance } = args;

  const partner = await context.entities.VirtualPartner.create({
    data: {
      personality,
      appearance,
      userId: context.user.id
    }
  });

  await context.entities.User.update({
    where: { id: context.user.id },
    data: { virtualPartnerId: partner.id }
  });

  return partner;
}

export const logInteraction = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { type, content } = args;
  const { virtualPartnerId } = context.user;

  const interactionLog = await context.entities.InteractionLog.create({
    data: {
      timestamp: new Date(),
      type,
      content,
      partnerId: virtualPartnerId
    }
  });

  const virtualPartner = await context.entities.VirtualPartner.findUnique({
    where: { id: virtualPartnerId }
  });

  return virtualPartner;
}
