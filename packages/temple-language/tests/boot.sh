#!/usr/bin/env bash

export CODE_TESTS_PATH="$(pwd)/tests/out/asserts"
export CODE_TESTS_WORKSPACE="$(pwd)/tests/out/workspace"

node "$(pwd)/tests/out/workspace/run.js"