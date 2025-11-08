
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LESSOPEN: string;
	export const ParaView_TYPE: string;
	export const WM_PROJECT: string;
	export const FOAM_SITE_LIBBIN: string;
	export const WM_DIR: string;
	export const USER: string;
	export const FOAM_SIGFPE: string;
	export const npm_config_user_agent: string;
	export const GIT_ASKPASS: string;
	export const npm_node_execpath: string;
	export const ParaView_INCLUDE_DIR: string;
	export const SHLVL: string;
	export const LD_LIBRARY_PATH: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const OLDPWD: string;
	export const TERM_PROGRAM_VERSION: string;
	export const NVM_BIN: string;
	export const VSCODE_IPC_HOOK_CLI: string;
	export const npm_package_json: string;
	export const NVM_INC: string;
	export const WM_PROJECT_DIR: string;
	export const WM_ARCH_OPTION: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const PS1: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const FOAM_ETC: string;
	export const WM_COMPILE_OPTION: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const COLORTERM: string;
	export const WSL_DISTRO_NAME: string;
	export const FOAM_EXT_LIBBIN: string;
	export const FOAM_SITE_APPBIN: string;
	export const FOAM_USER_LIBBIN: string;
	export const COLOR: string;
	export const NVM_DIR: string;
	export const LOGNAME: string;
	export const FOAM_JOB_DIR: string;
	export const WM_LINK_LANGUAGE: string;
	export const FOAM_APP: string;
	export const WM_LDFLAGS: string;
	export const FOAM_MODULES: string;
	export const NAME: string;
	export const ParaView_LIB_DIR: string;
	export const ParaView_MAJOR: string;
	export const WSL_INTEROP: string;
	export const WM_CFLAGS: string;
	export const MPI_ARCH_PATH: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const npm_config_npm_version: string;
	export const WM_PRECISION_OPTION: string;
	export const ParaView_DIR: string;
	export const TERM: string;
	export const npm_config_cache: string;
	export const FOAM_MPI: string;
	export const WM_COMPILER_LIB_ARCH: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const PV_PLUGIN_PATH: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const FOAM_UTILITIES: string;
	export const FOAM_SRC: string;
	export const WM_CXX: string;
	export const FOAM_USER_APPBIN: string;
	export const WM_OPTIONS: string;
	export const WM_PROJECT_VERSION: string;
	export const LANG: string;
	export const FOAM_SETTINGS: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const TERM_PROGRAM: string;
	export const npm_lifecycle_script: string;
	export const WM_ARCH: string;
	export const SHELL: string;
	export const FOAM_LIBBIN: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const WM_THIRD_PARTY: string;
	export const WM_OSTYPE: string;
	export const LESSCLOSE: string;
	export const WM_CC: string;
	export const MPI_BUFFER_SIZE: string;
	export const WM_COMPILER: string;
	export const WM_PROJECT_INST_DIR: string;
	export const WM_PROJECT_USER_DIR: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const GIT_PAGER: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const FOAM_TUTORIALS: string;
	export const ParaView_VERSION: string;
	export const npm_execpath: string;
	export const WM_MPLIB: string;
	export const WM_LABEL_SIZE: string;
	export const NVM_CD_FLAGS: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_global_prefix: string;
	export const FOAM_RUN: string;
	export const WM_THIRD_PARTY_DIR: string;
	export const npm_command: string;
	export const WM_LABEL_OPTION: string;
	export const WM_CXXFLAGS: string;
	export const FOAM_INST_DIR: string;
	export const FOAM_SOLVERS: string;
	export const FOAM_APPBIN: string;
	export const HOSTTYPE: string;
	export const WSLENV: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LESSOPEN: string;
		ParaView_TYPE: string;
		WM_PROJECT: string;
		FOAM_SITE_LIBBIN: string;
		WM_DIR: string;
		USER: string;
		FOAM_SIGFPE: string;
		npm_config_user_agent: string;
		GIT_ASKPASS: string;
		npm_node_execpath: string;
		ParaView_INCLUDE_DIR: string;
		SHLVL: string;
		LD_LIBRARY_PATH: string;
		npm_config_noproxy: string;
		HOME: string;
		OLDPWD: string;
		TERM_PROGRAM_VERSION: string;
		NVM_BIN: string;
		VSCODE_IPC_HOOK_CLI: string;
		npm_package_json: string;
		NVM_INC: string;
		WM_PROJECT_DIR: string;
		WM_ARCH_OPTION: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		PS1: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		FOAM_ETC: string;
		WM_COMPILE_OPTION: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		COLORTERM: string;
		WSL_DISTRO_NAME: string;
		FOAM_EXT_LIBBIN: string;
		FOAM_SITE_APPBIN: string;
		FOAM_USER_LIBBIN: string;
		COLOR: string;
		NVM_DIR: string;
		LOGNAME: string;
		FOAM_JOB_DIR: string;
		WM_LINK_LANGUAGE: string;
		FOAM_APP: string;
		WM_LDFLAGS: string;
		FOAM_MODULES: string;
		NAME: string;
		ParaView_LIB_DIR: string;
		ParaView_MAJOR: string;
		WSL_INTEROP: string;
		WM_CFLAGS: string;
		MPI_ARCH_PATH: string;
		_: string;
		npm_config_prefix: string;
		npm_config_npm_version: string;
		WM_PRECISION_OPTION: string;
		ParaView_DIR: string;
		TERM: string;
		npm_config_cache: string;
		FOAM_MPI: string;
		WM_COMPILER_LIB_ARCH: string;
		npm_config_node_gyp: string;
		PATH: string;
		PV_PLUGIN_PATH: string;
		NODE: string;
		npm_package_name: string;
		FOAM_UTILITIES: string;
		FOAM_SRC: string;
		WM_CXX: string;
		FOAM_USER_APPBIN: string;
		WM_OPTIONS: string;
		WM_PROJECT_VERSION: string;
		LANG: string;
		FOAM_SETTINGS: string;
		VSCODE_GIT_IPC_HANDLE: string;
		TERM_PROGRAM: string;
		npm_lifecycle_script: string;
		WM_ARCH: string;
		SHELL: string;
		FOAM_LIBBIN: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		WM_THIRD_PARTY: string;
		WM_OSTYPE: string;
		LESSCLOSE: string;
		WM_CC: string;
		MPI_BUFFER_SIZE: string;
		WM_COMPILER: string;
		WM_PROJECT_INST_DIR: string;
		WM_PROJECT_USER_DIR: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		GIT_PAGER: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		FOAM_TUTORIALS: string;
		ParaView_VERSION: string;
		npm_execpath: string;
		WM_MPLIB: string;
		WM_LABEL_SIZE: string;
		NVM_CD_FLAGS: string;
		XDG_DATA_DIRS: string;
		npm_config_global_prefix: string;
		FOAM_RUN: string;
		WM_THIRD_PARTY_DIR: string;
		npm_command: string;
		WM_LABEL_OPTION: string;
		WM_CXXFLAGS: string;
		FOAM_INST_DIR: string;
		FOAM_SOLVERS: string;
		FOAM_APPBIN: string;
		HOSTTYPE: string;
		WSLENV: string;
		INIT_CWD: string;
		EDITOR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
