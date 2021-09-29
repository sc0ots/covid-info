package com.example.demootp.model;

import com.example.demootp.model.ModelClass;

import java.util.ArrayList;

public class mainNews {

    private String status;
    private String totalResults;
    private ArrayList<ModelClass1> articles;

    public mainNews(String status, String totalResults, ArrayList<ModelClass1> articles) {
        this.status = status;
        this.totalResults = totalResults;
        this.articles = articles;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(String totalResults) {
        this.totalResults = totalResults;
    }

    public ArrayList<ModelClass1> getArticles() {
        return articles;
    }

    public void setArticles(ArrayList<ModelClass1> articles) {
        this.articles = articles;
    }
}
