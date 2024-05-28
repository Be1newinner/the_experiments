# scripts

    1. pdf-to-img.py
    2. resize-webp.py

Possible Errors

<strong>pdf-to-img.py</strong>
ERROR: Failed building wheel for traits
Failed to build traits
ERROR: Could not build wheels for traits, which is required to install pyproject.toml-based projects

<strong>solution</strong>

    1. Install Microsoft Visual C++ Build Tools:
        Make sure to select the "Desktop development with C++" workload during installation.
    2. pip install --upgrade setuptools
    3. pip install traits
