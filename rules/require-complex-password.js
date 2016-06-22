function (ctx, cb) {
	if (!ctx.user.password || ctx.user.password.length < 8) {
		return cb(new UnauthorizedError('Password does not match the password policy.'));
	};

	cb(null, ctx);
}
