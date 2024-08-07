function isNavItemActive(item) {
	if (item.url === this.page.url) {
		return true;
	}
	if (item.children) {
		return item.children.some((child) => isNavItemActive.call(this, child));
	}
	return false;
}

module.exports = {
	isNavItemActive,
};
