all:
	cd srcImg && java -jar plantuml.jar -o "../uml" *
	xelatex srs_sdd.tex
	xelatex srs_sdd.tex
	$(MAKE) clean
	@echo "SRS&SDD DONE. Build finished."	
ignore:
	rm -rf uml && rm *.pdf
clean:
	rm -rf *.acn *.alg *.glg *.glo *.gls *.glsdefs *.ist *.xdy *.acr *.bbl *.blg *.aux *.dvi *.log *.lot *.idx *.toc *.lof *.brf *.out

mrproper: clean
	rm -rf *.pdf
