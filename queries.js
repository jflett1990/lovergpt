import HttpError from '@wasp/core/HttpError.js'

export const getPartner = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.VirtualPartner.findUnique({
    where: { userId: context.user.id }
  });
}

export const getInteractions = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Fetch the authenticated user's virtual partner
  const virtualPartner = await context.entities.VirtualPartner.findUnique({
    where: { userId: context.user.id }
  });

  if (!virtualPartner) { throw new HttpError(404, 'Virtual partner not found') }

  // Fetch the interaction logs associated with the virtual partner
  const interactions = await context.entities.InteractionLog.findMany({
    where: { partnerId: virtualPartner.id },
    orderBy: { timestamp: 'desc' }
  });

  return interactions;
}
