async function guard(ctx, next) {
  if (ctx.message?.text?.startsWith('/start')) {
    next();
  } else if (ctx.message?.text?.startsWith('/')) {
    // Guard all Commands
    const requester_id = ctx.from.id;
    try {
      const administrators = await ctx.getChatAdministrators();
      const admin_identifiers = administrators.map(administrator => administrator?.user?.id);
      if (admin_identifiers.includes(requester_id)) {
        next();
      } else {
        ctx.reply('Questo BOT è utilizzabile solo dagli admin di un gruppo');
        return;
      }
    } catch (error) {
      ctx.reply('Questo BOT è utilizzabile solo dagli admin di un gruppo');
      return;
    }
  } else {
    next();
  }
}

export default guard;
