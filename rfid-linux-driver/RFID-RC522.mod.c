#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/elfnote-lto.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;
BUILD_LTO_INFO;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0xd9726f80, "module_layout" },
	{ 0x56470118, "__warn_printk" },
	{ 0xdf8c695a, "__ndelay" },
	{ 0x3528284f, "__spi_register_driver" },
	{ 0xeae3dfd6, "__const_udelay" },
	{ 0x6b10bee1, "_copy_to_user" },
	{ 0x761c978, "misc_register" },
	{ 0xc5850110, "printk" },
	{ 0xa62c2cd5, "driver_unregister" },
	{ 0x5d23273d, "spi_sync" },
	{ 0xc959d152, "__stack_chk_fail" },
	{ 0xbdfb6dbb, "__fentry__" },
	{ 0xda3a031e, "spi_write_then_read" },
	{ 0x13c49cc2, "_copy_from_user" },
	{ 0x6e2db325, "misc_deregister" },
	{ 0x88db9f48, "__check_object_size" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "7EE106288CAAE240291F1F2");
